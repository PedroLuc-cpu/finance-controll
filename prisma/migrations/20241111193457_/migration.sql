-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "passwordResetCode" TEXT DEFAULT '',
    "passwordResetExpires" DATETIME,
    "passwordResetAttempts" INTEGER DEFAULT 0,
    "lastResetAttempt" DATETIME,
    "confirmedPassword" TEXT,
    "emailVerified" DATETIME,
    "isNotification" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("confirmedPassword", "createdAt", "email", "emailVerified", "id", "image", "isNotification", "lastResetAttempt", "name", "password", "passwordResetAttempts", "passwordResetCode", "passwordResetExpires", "updatedAt") SELECT "confirmedPassword", "createdAt", "email", "emailVerified", "id", "image", "isNotification", "lastResetAttempt", "name", "password", "passwordResetAttempts", "passwordResetCode", "passwordResetExpires", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
