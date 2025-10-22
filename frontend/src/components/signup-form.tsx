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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup className="flex flex-col gap-6">
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
                      name="firstName"
                      placeholder="Nguyễn"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Tên</FieldLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Văn A"
                      required
                    />
                  </Field>
                </div>
              </Field>

              {/* Tên đăng nhập */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  placeholder="nguyenvana"
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nguyenvana@example.com"
                  required
                />
              </Field>

              {/* Mật khẩu và xác nhận mật khẩu */}
              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Xác nhận mật khẩu
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </Field>
                </div>
              </Field>

              {/* Nút đăng ký */}
              <Field>
                <Button type="submit" className="w-full">
                  Tạo tài khoản
                </Button>
              </Field>

              {/* Link chuyển sang đăng nhập */}
              <div className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link to="/login" className="underline hover:text-primary">
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
