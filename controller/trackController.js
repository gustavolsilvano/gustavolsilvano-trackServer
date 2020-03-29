const Track = require('../models/TrackModel');

exports.createTrack = async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations)
    return res.status(422).json({
      status: 'Error',
      message: 'You must provide a name and locations'
    });

  const { user } = req;
  try {
    const track = await Track.create({
      userId: user._id,
      name,
      locations
    });
    console.log(track);

    res.status(200).json({
      status: 'success',
      data: {
        track
      }
    });
  } catch (err) {
    res.status(422).json({
      status: 'Error',
      message: err.message
    });
  }
};

exports.getTracks = async (req, res) => {
  const { user } = req;
  const tracks = await Track.find({ userId: user._id });

  res.status(200).json({
    status: 'success',
    data: {
      tracks
    }
  });
};
