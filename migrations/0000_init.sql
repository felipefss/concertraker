CREATE TABLE "concerts" (
	"artist" varchar NOT NULL,
	"date" date,
	"id" serial PRIMARY KEY NOT NULL,
	"location" varchar NOT NULL,
	"notes" text,
	"venue" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"clerkId" varchar NOT NULL,
	"email" varchar NOT NULL,
	"firstName" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" varchar,
	"lastName" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "concerts" ADD CONSTRAINT "concerts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;