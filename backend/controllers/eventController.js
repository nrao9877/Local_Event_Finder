// controllers/eventController.js
import Event from '../models/Event.js';

// Create a new event
export const createEvent = async (req, res) => {
  const { title, description, location, date, price, category,imageUrl } = req.body;

  try {
    const event = new Event({
      title,
      description,
      location,
      date,
      price,
      category,
      imageUrl
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Get event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event by ID (Admin)
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, date, price, category } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.title = title || event.title;
    event.description = description || event.description;
    event.location = location || event.location;
    event.date = date || event.date;
    event.price = price || event.price;
    event.category = category || event.category;
    await event.save();
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event by ID (Admin)
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for server-side debugging
    res.status(500).json({ message: 'Server error' });
  }
};

