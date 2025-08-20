import { GoogleGenerativeAI } from '@google/generative-ai';

// Lấy API key từ biến môi trường của Vite.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// === PHẦN KIỂM TRA LỖI QUAN TRỌNG ===
// Trước khi làm bất cứ điều gì, hãy kiểm tra xem API key có tồn tại không.
// Nếu không tìm thấy key, ứng dụng sẽ dừng lại và báo lỗi rõ ràng trong Console.
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in the environment variables. Please check your Vercel project settings.");
}
// =====================================

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export const sendMessageToBot = async (message: string): Promise<string> => {
  try {
    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Lỗi giao tiếp với Gemini API:', error);
    // Trả về một thông báo lỗi thân thiện với người dùng
    return 'Xin lỗi, đã có lỗi xảy ra phía máy chủ. Vui lòng thử lại sau.';
  }
};
