CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('requesting', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."safety" AS ENUM('safe', 'caution', 'danger');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "area" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"safety" "safety" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "evacuation_place" (
	"id" serial PRIMARY KEY NOT NULL,
	"host_profile_id" text,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"picture_urls" text[],
	"area_id" integer,
	"address" text NOT NULL,
	"max_headcount" integer NOT NULL,
	"available_period_start" text NOT NULL,
	"available_period_end" text NOT NULL,
	"pet_allowed" boolean NOT NULL,
	"barrier_free" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guest_profile" (
	"profile_id" text PRIMARY KEY NOT NULL,
	"biography" text,
	"picture_urls" text[],
	"headcount" integer NOT NULL,
	"desired_area_id" integer,
	"desired_period_start" text NOT NULL,
	"desired_period_end" text NOT NULL,
	"has_pet" boolean NOT NULL,
	"need_barrier_free" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "host_profile" (
	"profile_id" text PRIMARY KEY NOT NULL,
	"biography" text,
	"picture_urls" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"gender" "gender" NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "request" (
	"id" serial PRIMARY KEY NOT NULL,
	"guest_profile_id" text,
	"evacuation_place_id" integer,
	"status" "request_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evacuation_place" ADD CONSTRAINT "evacuation_place_host_profile_id_host_profile_profile_id_fk" FOREIGN KEY ("host_profile_id") REFERENCES "public"."host_profile"("profile_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evacuation_place" ADD CONSTRAINT "evacuation_place_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guest_profile" ADD CONSTRAINT "guest_profile_profile_id_profile_user_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guest_profile" ADD CONSTRAINT "guest_profile_desired_area_id_area_id_fk" FOREIGN KEY ("desired_area_id") REFERENCES "public"."area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "host_profile" ADD CONSTRAINT "host_profile_profile_id_profile_user_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "request" ADD CONSTRAINT "request_guest_profile_id_guest_profile_profile_id_fk" FOREIGN KEY ("guest_profile_id") REFERENCES "public"."guest_profile"("profile_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "request" ADD CONSTRAINT "request_evacuation_place_id_evacuation_place_id_fk" FOREIGN KEY ("evacuation_place_id") REFERENCES "public"."evacuation_place"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
