import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = category ? { category } : {};
    const items = await Portfolio.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const file     = formData.get('image');
    const title    = formData.get('title');
    const category = formData.get('category');
    const alt      = formData.get('alt') || title;
    const tall     = formData.get('tall') === 'true';
    const featured = formData.get('featured') === 'true';

    if (!file || !title || !category) {
      return NextResponse.json({ error: 'Image, title and category are required' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await uploadImage(buffer, `amen-pictures/portfolio/${category}`);

    // Save to MongoDB
    const item = await Portfolio.create({
      title, category, alt, tall, featured,
      imageUrl:     result.secure_url,
      cloudinaryId: result.public_id,
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error('Portfolio upload error:', error);
return NextResponse.json({ error: error.message || 'Failed to upload image' }, { status: 500 });  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Item ID required' }, { status: 400 });

    const item = await Portfolio.findById(id);
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });

    // Delete from Cloudinary
    await deleteImage(item.cloudinaryId);

    // Delete from MongoDB
    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
