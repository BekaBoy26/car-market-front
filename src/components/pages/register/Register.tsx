"use client";
import React from "react";
import scss from "./register.module.scss";
import { useForm } from "react-hook-form";
import { IRegBody } from "@/types/authTypes";
import { useRegister } from "@/hooks/auth/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/authSchema";

const Register = () => {
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegBody>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IRegBody) => {
    console.log("WORK");
    mutate(data);
  };

  return (
    <section id={scss.reg}>
      <div className="container">
        <div className={scss.reg}>
          <div className={scss.regBanner}>
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

            <h1>Create your account</h1>
            <p>Join thousands of buyers and sellers</p>
          </div>

          <div className={scss.regForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2>
                  Full Name <span>*</span>
                </h2>

                <input
                  type="text"
                  placeholder="Adolf Hit..."
                  {...register("name")}
                />

                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div>
                <h2>
                  Email <span>*</span>
                </h2>

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email")}
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
                  {...register("password")}
                />

                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <div>
                <h2>
                  Chose Avatar <span>*</span>
                </h2>

                <input
                  type="file"
                  accept="image/*"
                  {...register("avatar")}
                />

                {errors.avatar && <p>{errors.avatar.message}</p>}
              </div>

              <button type="submit" disabled={isPending}>
                {isPending ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
