import { Point, connectDB } from './db.js';

// Vercel 接口入口
export default async function handler(req, res) {
  // 1. 设置 CORS 头部（允许跨域）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 3. 连接数据库
    await connectDB();

    // 4. 处理 GET 请求（获取数据）
    if (req.method === 'GET') {
      const data = await Point.find().sort({ date: -1 }); // 按时间倒序排列
      return res.status(200).json(data);
    }

    // 5. 处理 POST 请求（保存数据）
    if (req.method === 'POST') {
      const body = req.body;
      
      // 简单的数据校验
      if (!body.studentId || !body.name || body.points === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // 创建新记录并保存
      const newPoint = new Point(body);
      await newPoint.save();
      
      return res.status(200).json({ success: true, data: newPoint });
    }

    // 6. 方法不支持
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}