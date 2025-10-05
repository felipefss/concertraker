CREATE TABLE "concerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"artist" varchar NOT NULL,
	"venue" varchar,
	"location" varchar NOT NULL,
	"date" date,
	"notes" text,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	"userId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkId" varchar NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"imageUrl" varchar,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId")
);
--> statement-breakpoint
ALTER TABLE "concerts" ADD CONSTRAINT "concerts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;