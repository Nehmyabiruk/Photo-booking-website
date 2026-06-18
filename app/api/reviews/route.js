import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const approvedOnly = searchParams.get('approved') !== 'false';
    const query = approvedOnly ? { approved: true } : {};
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, rating, category, quote, eventDate } = body;

    if (!name || !rating || !quote) {
      return NextResponse.json({ error: 'Name, rating and review text are required' }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // New reviews go to admin for approval first
    const review = await Review.create({ name, email, rating, category, quote, eventDate, approved: false });
    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await connectDB();
    const { id, approved, featured } = await request.json();
    if (!id) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    const review = await Review.findByIdAndUpdate(id, { approved, featured }, { new: true });
    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    return NextResponse.json({ review });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}
