import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { GenericButton } from "../components/GenericButton";
import { Input } from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  localUserUpdate,
  userProfileCreate,
  userProfileUpdate,
  userProfileDelete,
} from "../features/currentUser/currentUserSlice";

const PersonalInfosScreen = ({ navigation, route }) => {
  const userProfile = useSelector((state) => state.currentUser.userProfile);
  console.log(userProfile);
  const [name, setName] = useState(userProfile.name || "");
  const [surname, setSurname] = useState(userProfile.surname || "");
  const [address, setAddress] = useState(userProfile.address || "");
  const [tel, setTel] = useState(userProfile.tel || "");
  const [postcode, setPostcode] = useState(userProfile.postcode || "");
  const [town, setTown] = useState(userProfile.town || "");

  const dispatch = useDispatch();

  const createUserProfileObject = () => {
    return {
      name,
      surname,
      address,
      tel,
      postcode,
      town,
    };
  };

  const createProfileHandler = () => {
    dispatch(userProfileCreate(createUserProfileObject()));
  };
  const updateProfileHandler = () => {
    dispatch(
      userProfileUpdate({
        data: createUserProfileObject(),
        id: userProfile.userProfileId,
      })
    );
  };
  const deleteProfileHandler = () => {
    dispatch(userProfileDelete(userProfile.userProfileId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <GenericButton
        name="Menu"
        onPress={() => navigation.toggleDrawer()}
      ></GenericButton>
      <Text>PersonalInfosScreen</Text>

      <Text>Name</Text>
      <Input value={name} changeHandler={setName} />
      <Text>Surname</Text>
      <Input value={surname} changeHandler={setSurname} />
      <Text>Address</Text>
      <Input value={address} changeHandler={setAddress} />
      <Text>Postcode</Text>
      <Input value={postcode} changeHandler={setPostcode} />
      <Text>Town</Text>
      <Input value={town} changeHandler={setTown} />
      <Text>Phone number</Text>
      <Input value={tel} changeHandler={setTel} />
      <GenericButton
        name="Create"
        onPress={createProfileHandler}
      ></GenericButton>
      <GenericButton
        name="Update"
        onPress={updateProfileHandler}
      ></GenericButton>
      <GenericButton
        name="Delete"
        onPress={deleteProfileHandler}
      ></GenericButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PersonalInfosScreen;
