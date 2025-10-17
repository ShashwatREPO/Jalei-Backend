-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "User_Freinds" (
    "initiatorUsername" TEXT NOT NULL,
    "recieverUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Freinds_pkey" PRIMARY KEY ("initiatorUsername","recieverUsername")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User_Freinds" ADD CONSTRAINT "User_Freinds_initiatorUsername_fkey" FOREIGN KEY ("initiatorUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Freinds" ADD CONSTRAINT "User_Freinds_recieverUsername_fkey" FOREIGN KEY ("recieverUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
