import assert from "node:assert/strict"
import test from "node:test"
import { challengeAt, challenges } from "./challenge-copy.ts"
import { challengeKeys, gradePath, gradeQuiz } from "./challenge-key.ts"
import { stages } from "./journey.ts"

test("every passage has a quiz and a path question", () => {
  for (const stage of stages) {
    const challenge = challengeAt(stage.id)
    const key = challengeKeys[stage.id]
    assert.ok(challenge, stage.id)
    assert.ok(key, stage.id)
    assert.equal(challenge.quiz.length, 3)
    assert.equal(key.quiz.length, 3)
    const prompts = [...challenge.quiz, challenge.path]
    for (const prompt of prompts) {
      assert.ok(prompt.prompt.length > 8, stage.id)
      assert.equal(new Set(prompt.choices).size, 3, stage.id)
    }
    for (const answer of key.quiz) assert.ok(answer >= 0 && answer <= 2)
    assert.ok(key.path >= 0 && key.path <= 2)
    assert.equal(gradeQuiz(stage.id, key.quiz), 3)
    assert.equal(gradePath(stage.id, key.path), true)
    assert.equal(gradeQuiz(stage.id, key.quiz.map((answer) => (answer + 1) % 3)), 0)
  }
  assert.equal(Object.keys(challenges).length, stages.length)
})
