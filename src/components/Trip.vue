<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-row class="text-center" align="center" justify="center">
          <v-col cols="12">
            <v-card class="pb-4">
              <v-row>
                <v-col>
                  <v-card-title> {{ text }} </v-card-title>
                  <v-text-field
                    class="pl-4 pr-4"
                    placeholder="Enter your desired destination"
                    v-model="input"
                    :loading="loading"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-btn :disabled="isFieldEmpty" @click="getRecommendations"
                    >Search</v-btn
                  >
                </v-col>
                <v-col cols="10"> </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="text-center" align="center" justify="center">
          <v-col cols="12">
            <v-card
              v-for="hotel in recommendationResult.hotelDTOS"
              :key="hotel.name"
              class="mb-4"
            >
              <v-card-title>
                {{ hotel.name }}
              </v-card-title>
              <v-card-subtitle style="text-align: left">
                {{ hotel.address }}
              </v-card-subtitle>
              <v-rating
              :value="hotel.stars"
              color="amber"
              dense
              half-increments
              size="18"
              style="text-align: left; margin-left: 14px; margin-top: -16px;"
              background-color="grey">
              </v-rating>

              <p style="text-align: left" class="ml-4">Restaurants nearby</p>
              <v-data-table
                hide-default-footer
                :headers="headers"
                :items="hotel.foodPlaces"
              >
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>


      <v-col cols="12" lg="3">
        <v-card class="mt-3">
          <v-card-title>
            Top 3 trending destinations!
          </v-card-title>
          <v-data-table
          hide-default-footer
          :items="recommendationResult.topCities"
          :headers="cityHeaders"
          >
          
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TripService from "@/APIService/TripService.js";
export default {
  name: "Trip",

  data: () => ({
    text: "Trips",
    input: "",
    loading: false,
    recommendationResult: {},
    headers: [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Address",
        value: "address",
      },
      {
        text: "Rating",
        value: "rating",
      },
    ],
    cityHeaders: [
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'No. of searches',
        value: 'noOfSearches'
      }
    ]
  }),
  methods: {
    getRecommendations() {
      this.loading = true;
      TripService.getRecommendations(this.input)
        .then((result) => {
          
          for (let [key, value] of Object.entries(result)) {
              console.log("Key, value: " + key, value);
          }

          for (let [key, value] of Object.entries(result.data)) {
              console.log("Key, value: " + key, value);
          }
          
          this.loading = false;
          this.recommendationResult = result.data;
        })
        .catch((err) => {
          this.loading = false;
          console.log("Error here: " + err);
        });
    },
  },

  watch: {
    recommendationResult() {
      this.recommendationResult;
    },
  },

  computed: {
    isFieldEmpty() {
      return this.input == "";
    },
    isRecommendationsNotNull() {
      return this.recommendationResult.topCities != null;
    },
    isNotNull() {
      return this.recommendationResult != {};
    },
    isLoading() {
      return this.loading;
    }
  },
};
</script>
