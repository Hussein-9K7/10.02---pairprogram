const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // يضمن أن يكون البريد الإلكتروني فريدًا في قاعدة البيانات
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    membership_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // يضيف تلقائيًا حقول createdAt و updatedAt لتتبع تاريخ الإنشاء والتحديث
);

// تصدير نموذج المستخدم
module.exports = mongoose.model("User", userSchema);
