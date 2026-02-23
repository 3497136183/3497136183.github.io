import mongoose from 'mongoose';

// 1. 定义数据模型（Schema）
// 假设你的积分数据包含：学号、姓名、积分、时间
const PointSchema = new mongoose.Schema({
  studentId: String,   // 学号
  name: String,        // 姓名
  points: Number,      // 积分
  date: { type: Date, default: Date.now } // 记录时间
});

// 2. 创建模型
const Point = mongoose.model('Point', PointSchema);

// 3. 连接数据库函数
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // 如果已连接，直接返回

  try {
    // 注意：这里使用了环境变量 MONGODB_URI
    // 请确保在 Vercel 后台配置了这个环境变量
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export { Point, connectDB };