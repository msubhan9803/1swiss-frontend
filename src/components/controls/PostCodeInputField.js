import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from 'react-places-autocomplete';

const searchOptions = {
  types: ['(cities)'],
  // country: "<code>'fr'</code>",
  componentRestrictions: { country: "fr" },
}

class PostCodeInputField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.props.handlePostCodeAddressChange(address);
  };

  handleSelect = async address => {
    const geoCode = await geocodeByAddress(address)
    const formattedAddress = geoCode[0].formatted_address;
    this.props.handlePostCodeAddressChange(formattedAddress)
    const placeId = geoCode[0].place_id;
    const [place] = await geocodeByPlaceId(placeId);
    const { long_name: postalCode = '' } =
      place.address_components.find(c => c.types.includes('postal_code')) || {};
    this.props.onChangeHanlder(parseInt(postalCode))
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.props.postCodeAddress}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          console.log('suggestions: ', suggestions)
          return (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Ex: 80800',
                  className: 'my-4 bg-slate-100 w-full h-12 rounded-lg border-2 border-slate-300 p-2 pl-4 focus-visible:border-slate-100 flex items-center hover:border-blue-500',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = "my-2 bg-slate-100 w-full h-12 rounded-lg border-2 cursor-pointer border-blue-200 p-2 pl-4 focus-visible:border-slate-100 flex items-center hover:border-blue-500 cursor-pointer";
                  // inline style for demonstration purpose
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        }}
      </PlacesAutocomplete>
    );
  }
}

export default PostCodeInputField;