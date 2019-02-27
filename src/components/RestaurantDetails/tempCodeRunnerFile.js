 // Ocenianie
  handleRatingClick = (rate, id, userId) => {
    const locationId = this.props.location.state.res.id;
    const name = this.props.restaurant.find(r => r.id === locationId);
    const incrementedCount = name.ratingCount + 1;
    const incrementedRating = name.rating + rate;
    this.props.addRatingToRestaurant(incrementedRating, incrementedCount, id);
    this.props.addRatingToUserProfile(id, userId);
    this.checkIfUserRateThisLocation();
    this.handlePopUp();
  };
  //