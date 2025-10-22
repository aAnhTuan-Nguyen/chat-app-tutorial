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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              {/* Logo và tiêu đề */}
              <div className="flex justify-center items-center gap-2 text-2xl font-bold">
                <Link to="/">
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    className="h-10 w-auto md:h-12"
                  />
                </Link>
                Moji
              </div>

              {/* Họ và tên */}
              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="firstName">Họ</FieldLabel>
                  <FieldDescription>Nhập họ của bạn</FieldDescription>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Nguyễn"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Tên</FieldLabel>
                  <FieldDescription>Nhập tên của bạn</FieldDescription>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Văn A"
                    required
                  />
                </Field>
              </div>

              {/* Tên đăng nhập */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <FieldDescription>Nhập tên đăng nhập của bạn</FieldDescription>
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
                <FieldDescription>Nhập địa chỉ email của bạn</FieldDescription>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nguyenvana@example.com"
                  required
                />
              </Field>

              {/* Mật khẩu */}
              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <FieldDescription>Nhập mật khẩu của bạn</FieldDescription>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </Field>

              {/* Nút đăng ký */}
              <Field>
                <Button type="submit" className="w-full">
                  Tạo tài khoản
                </Button>
              </Field>

              <div className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link to="/login" className="underline hover:text-primary">
                  Đăng nhập
                </Link>
              </div>

              {/* todo : error message */}
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
        Khi bạn nhấn vào, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a>.
      </FieldDescription>
    </div>
  )
}
