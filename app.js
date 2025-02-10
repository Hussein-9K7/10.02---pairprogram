require('dotenv').config();  // تحميل البيئة من ملف .env
const connectDB = require('./config/db');
const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");

// استيراد middleware
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const morgan = require("morgan");

// استخدام morgan لتسجيل تفاصيل الطلبات في الـ console
app.use(morgan("dev"));

// الاتصال بقاعدة البيانات
connectDB();

// استخدام express.json لتحليل جسم الطلبات التي تحتوي على JSON
app.use(express.json());

// تعريف المسارات
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter); 

// مسار لمحاكاة حدوث خطأ
app.get('/error', (req, res, next) => {
  // إنشاء خطأ
  const error = new Error("Something went wrong!");
  // تمرير الخطأ إلى middleware الخاص بالتعامل مع الأخطاء
  next(error);
});

// معالجة المسارات غير المعروفة (404)
app.use(unknownEndpoint);

// استخدام errorHandler بعد كل شيء للتعامل مع الأخطاء
app.use(errorHandler);

// تحديد المنفذ (port) من البيئة أو استخدام 4000 كبديل
const port = process.env.PORT || 4000;

// بدء تشغيل الخادم
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/tours , http://localhost:${port}/api/users`);
});
