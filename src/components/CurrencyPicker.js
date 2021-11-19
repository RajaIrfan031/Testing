import CountryPicker from "react-native-region-country-picker";
 
let countryPickerRef = undefined;
 
// use countryPickerRef
countryPickerRef.open();
countryPickerRef.close();
 
<CurrencyPicker
    countryPickerRef={(ref) => {
      countryPickerRef = ref;
    }}
    enable={true}
    darkMode={false}
    countryCode={"US"}
    showFlag={true}
    showCallingCode={true}
    showCountryName={true}
    showCountryCode={true}
    onSelectCountry={(data) => {
      console.log("DATA", data);
    }}
    onOpen={() => {
      console.log("Open");
    }}
    onClose={() => {
      console.log("Close");
    }}
    containerStyle={{
      container: {},
      flagStyle: {},
      callingCodeStyle: {},
      countryCodeStyle: {},
      countryNameStyle: {},
    }}
    modalStyle={{
      container: {},
      searchStyle: {},
      tileStyle: {},
      itemStyle: {
        itemContainer: {},
        flagStyle: {},
        countryCodeStyle: {},
        countryNameStyle: {},
        callingNameStyle: {},
      },
    }}
    title={"Country"}
    searchPlaceholder={"Search"}
    showCloseButton={true}
    showModalTitle={true}
/>
  ;