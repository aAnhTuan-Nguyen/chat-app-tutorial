import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Họ phải từ 2 đến 100 ký tự" })
      .max(100),
    lastName: z
      .string()
      .min(2, { message: "Tên phải từ 2 đến 100 ký tự" })
      .max(100),
    username: z
      .string()
      .min(2, { message: "Username phải từ 2 đến 100 ký tự" })
      .max(100),
    email: z.email({ message: "Email không hợp lệ" }),
    password: z.string().min(6, { message: "Mật khẩu phải từ 6 ký tự" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Xác nhận mật khẩu phải từ 6 ký tự" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  // Xử lý khi submit form
  const onSubmit = async (data: SignUpFormData) => {
    console.log("Form data:", data)
    // Thực hiện các hành động đăng ký tại đây
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
                <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Nhập thông tin của bạn bên dưới để tạo tài khoản
                </p>
              </div>

              {/* Họ và tên */}
              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="firstName">Họ</FieldLabel>
                    <Input
                      id="firstName"
                      placeholder="Nguyễn"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Tên</FieldLabel>
                    <Input
                      id="lastName"
                      placeholder="Văn A"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </Field>
                </div>
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="nguyenvana@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </Field>

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
                <div className="grid grid-cols-2 gap-4">
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
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Xác nhận mật khẩu
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>
                </div>
              </Field>

              {/* Nút đăng ký */}
              <Field>
                <Button
                  type="submit"
                  className="w-full hover:scale-[1.02] transition-transform"
                  disabled={isSubmitting}
                >
                  Tạo tài khoản
                </Button>
              </Field>

              {/* Link chuyển sang đăng nhập */}
              <div className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link to="/signin" className="underline hover:text-primary">
                  Đăng nhập
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
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
