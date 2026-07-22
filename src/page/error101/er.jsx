import { Link, useNavigate } from "react-router-dom"

function ErrorDefault() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black p-4">
      <div className="w-full max-w-lg mb-6 overflow-hidden rounded-2xl shadow-2xl border-2 border-red-800">
        <video 
          src="https://res.cloudinary.com/vb1uz1eq/video/upload/v1784667011/Sukuna_tells_Mahito_to_know_his_place_online-video-cutter.com_gxzksk.mp4" 
          autoPlay 
          loop 
          controls 
          className="w-full h-auto object-cover"
        >
          Ваш браузер не поддерживает видео.
        </video>
      </div>

      <h2 className="text-3xl font-extrabold text-red-600 mb-6 text-center">
        Ты со страницей <span className="text-yellow-500">ошибся</span>!!!
      </h2>

      <div className="flex gap-4">
        <Link 
          to="/" 
          className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition-all"
        >
          На главную
        </Link>

        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all"
        >
          Вернуться назад
        </button>
      </div>
    </div>
  )
}

export default ErrorDefault;