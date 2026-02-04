import Link from "next/link";

type BottomAuthFormProps = {
  variant?: "login" | "signup" | "forget-password" | "change-password";
};

export default function BottomAuth({ variant = "login" }: BottomAuthFormProps) {
  const isLogin = variant === "login";
  const isSignup = variant === "signup";
  const isForgetPassword = variant === "forget-password";
  const isChangePassword = variant === "change-password";

  const linkHref = isLogin ? "/sign-up" : "/login";
  const linkText = isLogin ? "Sign up" : "Log in";
  const promptText = isLogin
    ? "Don't have an account yet ?"
    : "Already have an account ?";
  return (
    <>
      {/* Google & Apple - only show for login and signup */}
      {(isLogin || isSignup) && (
        <div className="mt-5">
          {/* <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-border" />
            <span className="text-text-gray text-h8-regular">or continue with</span>
            <div className="h-[1px] flex-1 bg-border" />
          </div> */}

          {/* Google & Apple Btns */}
          {/* <GoogleAppBtn /> */}
        </div>
      )}

      {/* Account prompt - only show for login and signup */}
      {(isLogin || isSignup) && (
        <div className="text-black mt-5 text-center">
          <span className="text-h8-regular">{promptText}</span>{" "}
          <Link href={linkHref} className="text-h8-semibold text-primary underline">{linkText}</Link>
        </div>
      )}

      {/* For forget password and change password, show login link */}
      {(isForgetPassword || isChangePassword) && (
        <div className="text-black mt-5 text-center">
          <span className="text-h8-regular">Remember your password?</span>{" "}
          <Link href="/login" className="text-h8-semibold text-primary underline">Log in</Link>
        </div>
      )}
    </>
  )
}
