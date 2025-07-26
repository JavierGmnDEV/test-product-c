CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"category" varchar(100),
	"stock" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
