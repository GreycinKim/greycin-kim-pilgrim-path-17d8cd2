"use client"

import { unstable_rethrow } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { beginQuiz, submitQuiz } from "@/app/actions/score"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { challengeAt } from "@/lib/challenge-copy"
import { getStage } from "@/lib/journey"
import { PATH_POINTS, QUIZ_CORRECT, QUIZ_SECONDS, QUIZ_TIME_BONUS } from "@/lib/score"

const emptyAnswers = [-1, -1, -1, -1]

export function PlaceChallenges({
  stageId,
  reached,
  quizScore,
  taken,
}: {
  stageId: string
  reached: boolean
  quizScore: number
  taken: boolean
}) {
  const challenge = challengeAt(stageId)
  if (!challenge) return null

  return (
    <section className="space-y-3 border-t border-[#241c14]/10 pt-3" aria-label="Challenges">
      <div>
        <h3 className="text-sm font-medium">Challenges</h3>
        <p className="mt-1 text-xs leading-relaxed text-[#5c4e3d]">
          50 points for arriving. I’ve read this passage opens one quiz: {QUIZ_CORRECT} points a question, {PATH_POINTS}{" "}
          for the path, and {QUIZ_TIME_BONUS} more if you finish inside {QUIZ_SECONDS} seconds.
        </p>
      </div>
      {reached ? <p className="text-sm">Arrived · 50 points</p> : null}
      {taken ? <p className="text-sm">Quiz taken · {quizScore} points</p> : null}
    </section>
  )
}

export function QuizDialog({
  stageId,
  onClose,
  onScored,
  onRecorded,
}: {
  stageId: string
  onClose: () => void
  onScored: (total: number, message: string) => void
  onRecorded: (points: number) => void
}) {
  const challenge = challengeAt(stageId)
  const title = getStage(stageId)?.title ?? "This passage"
  const [seconds, setSeconds] = useState(QUIZ_SECONDS)
  const [answers, setAnswers] = useState(emptyAnswers)
  const [ready, setReady] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const answersRef = useRef(emptyAnswers)
  const sent = useRef(false)
  const deadline = useRef(0)

  const finish = useCallback(async () => {
    if (sent.current) return
    sent.current = true
    setPending(true)
    setError("")
    try {
      const result = await submitQuiz(stageId, answersRef.current)
      if ("error" in result) {
        setError(result.error ?? "The quiz could not be saved.")
        sent.current = false
        return
      }
      const timing = result.inTime ? " The time bonus is included." : " The clock ran out, so there is no time bonus."
      const pathLine = result.pathRight ? ` The path is right, ${PATH_POINTS} points.` : " The path is missed."
      const message = `${result.correct} of 3 correct.${pathLine}${timing} ${result.points} points.`
      onRecorded(result.points)
      onScored(result.total, message)
      onClose()
    } catch (caught) {
      unstable_rethrow(caught)
      sent.current = false
      setError("The quiz could not be saved.")
    } finally {
      setPending(false)
    }
  }, [onClose, onRecorded, onScored, stageId])

  useEffect(() => {
    let cancelled = false
    async function open() {
      try {
        const result = await beginQuiz(stageId)
        if (cancelled) return
        if ("error" in result && result.error) {
          setError(result.error)
          return
        }
        if (!("startedAt" in result) || !result.startedAt) {
          setError("The quiz could not be started.")
          return
        }
        answersRef.current = emptyAnswers
        sent.current = false
        deadline.current = Date.parse(result.startedAt) + QUIZ_SECONDS * 1000
        setAnswers(emptyAnswers)
        setSeconds(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)))
        setReady(true)
      } catch (caught) {
        unstable_rethrow(caught)
        if (!cancelled) setError("The quiz could not be started.")
      }
    }
    void open()
    return () => {
      cancelled = true
    }
  }, [stageId])

  useEffect(() => {
    if (!ready || sent.current) return
    const timer = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))
      setSeconds(left)
      if (left === 0) void finish()
    }, 250)
    return () => window.clearInterval(timer)
  }, [finish, ready])

  function choose(index: number, choice: number) {
    const next = answersRef.current.map((value, item) => (item === index ? choice : value))
    answersRef.current = next
    setAnswers(next)
  }

  return (
    <Dialog
      open
      disablePointerDismissal={!error}
      onOpenChange={(open, details) => {
        if (open) return
        if (error) {
          onClose()
          return
        }
        details.cancel()
        if (ready && !pending) void finish()
      }}
    >
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex items-start justify-between gap-3">
            <DialogTitle>{title}</DialogTitle>
            {error ? (
              <DialogClose className="rounded-full px-3 py-2 text-sm text-[#8a6232]">Close</DialogClose>
            ) : (
              <button
                type="button"
                className="text-xs text-[#8a6232] underline-offset-2 hover:underline disabled:opacity-40"
                disabled={!ready || pending}
                onClick={() => void finish()}
              >
                {pending ? "Saving…" : "Close"}
              </button>
            )}
          </div>
          <DialogDescription className="mt-2">
            One chance. {QUIZ_SECONDS} seconds. {QUIZ_CORRECT} points for each right answer, {PATH_POINTS} for the
            path, and {QUIZ_TIME_BONUS} more if you finish in time. Closing submits what you have chosen.
          </DialogDescription>
          {!ready && !error ? <p className="mt-4 text-sm">Opening the quiz…</p> : null}
          {ready && challenge ? (
            <div className="mt-4 space-y-3">
              <p className="font-heading text-4xl leading-none" aria-live="polite">
                {seconds}s
              </p>
              {[...challenge.quiz, challenge.path].map((question, index) => (
                <fieldset key={`${index}-${question.prompt}`} className="space-y-1.5">
                  <legend className="text-sm font-medium">{question.prompt}</legend>
                  {question.choices.map((choice, choiceIndex) => {
                    const selected = answers[index] === choiceIndex
                    return (
                      <button
                        key={choice}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => choose(index, choiceIndex)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                          selected ? "bg-[#241c14] text-[#f4ecdf]" : "bg-[#e7dcc6] text-[#241c14]"
                        }`}
                      >
                        {choice}
                      </button>
                    )
                  })}
                </fieldset>
              ))}
              <Button type="button" className="h-10 w-full" disabled={pending} onClick={() => void finish()}>
                {pending ? "Saving…" : "Submit quiz"}
              </Button>
            </div>
          ) : null}
          {error ? (
            <p role="alert" className="mt-4 text-sm text-[#7d2e28]">
              {error}
            </p>
          ) : null}
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}
