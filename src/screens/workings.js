<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 35,
    marginTop: 15,
  }}
>
  <TouchableOpacity
    style={{
      width: 45,
      height: 45,
      borderRadius: 15,
      backgroundColor: "#fff",
      elevation: 15,
    }}
    onPress={() => navigation.navigate("ChamaNameWallet")}
  >
    <Image
      source={circle}
      style={{
        width: 30,
        height: 30,
        alignSelf: "center",
        marginVertical: 7,
      }}
    />
  </TouchableOpacity>
</View>;
