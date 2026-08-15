"use client";

import React from "react";
import scss from "./login.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/auth/useLogin";
import { ILoginBody } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";

const Login = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginBody>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILoginBody) => {
    mutate(data);
  };

  return (
    <section id={scss.login}>
      <div className="container">
        <div className={scss.login}>
          <div className={scss.logBanner}>
            <div className="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>

            <h1>Sign in to AutoMark</h1>
            <p>Buy and Sell cars with confidence</p>
          </div>

          <div className={scss.loginForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2>
                  Email <span>*</span>
                </h2>

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div>
                <h2>
                  Password <span>*</span>
                </h2>

                <input
                  type="password"
                  placeholder="********"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <h2>
              Don't have an account?{" "}
              <span
                onClick={() => router.push("/register")}
                style={{ cursor: "pointer" }}
              >
                Create One
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
