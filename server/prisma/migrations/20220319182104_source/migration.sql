-- CreateTable
CREATE TABLE "Source" (
    "searchId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "hasLargeImages" BOOLEAN NOT NULL,
    "hasPrice" BOOLEAN NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("searchId")
);
