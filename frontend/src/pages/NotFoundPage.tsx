import { useNavigate } from "react-router"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center relative">
        {/* Animated 404 Number */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 dark:opacity-50 bg-linear-to-r from-primary via-secondary to-accent -z-10"></div>
        </div>

        {/* Floating Emoji */}
        <div className="flex justify-center gap-4 my-6">
          <span
            className="text-6xl animate-bounce"
            style={{ animationDelay: "0ms" }}
          >
            😵
          </span>
          <span
            className="text-6xl animate-bounce"
            style={{ animationDelay: "150ms" }}
          >
            🔍
          </span>
          <span
            className="text-6xl animate-bounce"
            style={{ animationDelay: "300ms" }}
          >
            ❓
          </span>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ôi không! Trang không tồn tại
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Có vẻ như bạn đã lạc vào vùng đất không tồn tại. Đừng lo, hãy quay về
          trang chủ nhé! 🏠
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full 
                                             hover:bg-primary/90 transform hover:scale-105 transition-all duration-300
                                             shadow-lg hover:shadow-primary/50"
          >
            🏠 Về trang chủ
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-transparent border-2 border-border text-foreground font-semibold rounded-full
                                             hover:bg-muted hover:border-primary/50 transform hover:scale-105 transition-all duration-300"
          >
            ← Quay lại
          </button>
        </div>

        {/* Decorative Stars */}
        <div className="absolute top-20 left-20 text-accent text-2xl animate-ping">
          ✨
        </div>
        <div
          className="absolute top-40 right-32 text-accent text-xl animate-ping"
          style={{ animationDelay: "500ms" }}
        >
          ⭐
        </div>
        <div
          className="absolute bottom-32 left-40 text-accent text-3xl animate-ping"
          style={{ animationDelay: "1000ms" }}
        >
          💫
        </div>
        <div
          className="absolute bottom-20 right-20 text-accent text-2xl animate-ping"
          style={{ animationDelay: "750ms" }}
        >
          ✨
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
