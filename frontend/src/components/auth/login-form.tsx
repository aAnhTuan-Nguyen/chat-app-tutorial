import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores/useAuthStore"

const signInSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username phải từ 2 đến 100 ký tự" })
    .max(100),
  password: z.string().min(6, { message: "Mật khẩu phải từ 6 ký tự" }),
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })
  const { signIn } = useAuthStore()
  const navigate = useNavigate()

  // Xử lý khi submit form
  const onSubmit = async (data: SignInFormData) => {
    // console.log("Form data:", data)

    await signIn(data)
    navigate("/")
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              {/* Tiêu đề form */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div>
                  <Link to="/" className="flex items-center gap-2">
                    <img
                      src="/logo.svg"
                      alt="Logo"
                      className="h-10 w-auto md:h-12"
                    />
                    <span className="text-2xl font-bold">Moji</span>
                  </Link>
                </div>
                <h1 className="text-2xl font-bold">Chào mừng bạn trở lại!</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Nhập thông tin của bạn bên dưới để đăng nhập
                </p>
              </div>
              {/* Tên đăng nhập */}
              <Field>
                <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
                <Input
                  id="username"
                  placeholder="nguyenvana"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </Field>
              {/* Mật khẩu và xác nhận mật khẩu */}
              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Nút đăng nhập */}
              <Field>
                <Button
                  type="submit"
                  className="w-full hover:scale-[1.02] transition-transform"
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </Button>
              </Field>

              {/* Link chuyển sang đăng nhập */}
              <div className="text-center text-sm text-muted-foreground">
                Chưa có tài khoản?{" "}
                <Link to="/signup" className="underline hover:text-primary">
                  Đăng ký
                </Link>
              </div>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
