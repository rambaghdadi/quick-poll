-- CreateTable
CREATE TABLE "PollQuestion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3),
    "title" TEXT NOT NULL,

    CONSTRAINT "PollQuestion_pkey" PRIMARY KEY ("id")
);
