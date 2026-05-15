import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl">
          <History className="h-7 w-7 text-gray-400 dark:text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Geçmiş Aramalar</h2>
        <p className="text-gray-400 dark:text-gray-600 text-sm font-light max-w-xs">
          Yaptığınız aramalar burada görünecek. Henüz bir arama yapılmadı.
        </p>
      </div>
    </div>
  );
}
