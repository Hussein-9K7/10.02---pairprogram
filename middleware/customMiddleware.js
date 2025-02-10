// middleware/customMiddleware.js

// Middleware لتسجيل تفاصيل الطلبات
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); // الانتقال إلى الميدلوير التالي
};

// Middleware للتعامل مع المسارات غير المعروفة (404)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Middleware للتعامل مع الأخطاء
const errorHandler = (error, request, response, next) => {
  console.error(error.message); // طباعة الخطأ في السيرفر
  
  // إرسال استجابة للمستخدم مع حالة 500 ورسالة عامة
  response.status(500).json({
    message: "Network problem", // يمكن تغيير هذه الرسالة إذا أردت إظهار تفاصيل الخطأ للمستخدم
  });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
