-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password_hash" TEXT,
    "github_id" TEXT
);
INSERT INTO "new_User" ("github_id", "id", "password_hash", "username") SELECT "github_id", "id", "password_hash", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
