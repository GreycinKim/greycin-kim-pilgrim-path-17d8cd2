import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import test from "node:test"
import { zipStore } from "./zip-store.ts"

test("a stored zip round-trips through unzip", () => {
  const archive = zipStore([
    { name: "CM Retreat/Hopeful/Packed for the night.jpg", data: Buffer.from("picture") },
    { name: "CM Retreat/note.txt", data: Buffer.from("hello") },
  ])
  const dir = mkdtempSync(path.join(tmpdir(), "waymark-zip-"))
  const file = path.join(dir, "pictures.zip")
  writeFileSync(file, archive)
  execFileSync("unzip", ["-t", file], { stdio: "pipe" })
  execFileSync("unzip", ["-o", file, "-d", dir], { stdio: "pipe" })
  assert.equal(readFileSync(path.join(dir, "CM Retreat/note.txt"), "utf8"), "hello")
})
