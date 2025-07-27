import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all animals cards
export const fetchAnimals = createAsyncThunk(
  "animals/fetchAnimal",
  async (_, thunkAPI) => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/animals`);
    if (!res.ok) throw new Error("Failed to fetch animals");
    return res.json();
  }
);

// Add new animal
export const addAnimal = createAsyncThunk(
  "animals/addAnimal",
  async (animalData, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    // const res = await fetch(`${import.meta.env.VITE_API_URI}/animals/new`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: animalData,
    // });
    const res = await axios.post(
      `${import.meta.env.VITE_API_URI}/animals/new`,
      animalData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res) throw new Error("An error occured while adding animal");
    return await res.data;
  }
);

// Get animal card
export const getAnimal = createAsyncThunk(
  "animals/getAnimal",
  async (blogSlug, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const res = await fetch(
      `${import.meta.env.VITE_API_URI}/animals/${blogSlug}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  }
);

// Update animal
export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async ({ blogSlug, updatedData }, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const res = await fetch(
      `${import.meta.env.VITE_API_URI}/animals/${blogSlug}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedData,
      }
    );
    if (!res.ok) throw new Error("Failed to update animal");
    return await res.json();
  }
);

// Delete animal
export const deleteAnimal = createAsyncThunk(
  "animals/deleteAnimal",
  async (blogSlug, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const res = await fetch(
      `${import.meta.env.VITE_API_URI}/animals/${blogSlug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to delete animal");
    return blogSlug;
  }
);

const animalSlice = createSlice({
  name: "animals",
  initialState: {
    animals: [
      {
        blogSlug: 1,
        title: "Tiger Conservation",
        description: "This article is related to tiger conservation",
        tags: ["mammal", "carnivore"],
        imageFile:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSr_oSm7qHSE-5rENE5sCmOfq6cFQV2bCVmyp0AoE3fksr7eH3Uv5C9LFGWO1egoIUveMFx8M0ffXKxJOEyKRMBAGq24Be7jwtaPbBxj7QC",
      },
      {
        blogSlug: 2,
        title: "Alligator Conservation",
        description: "This article is related to alligator conservation",
        tags: ["reptile", "carnivore"],
        imageFile:
          "https://media.istockphoto.com/blogSlug/174673392/photo/alligator-smiley.webp?a=1&b=1&s=612x612&w=0&k=20&c=M3r0WnpxQw0QKCSZY9peeLq1ql0ipurzlpJR0Tfr-BQ=",
      },
      {
        blogSlug: 3,
        title: "Bear Conservation",
        description: "This article is related to bear conservation",
        tags: ["mammal", "omnivore"],
        imageFile:
          "https://images.unsplash.com/photo-1568162603664-fcd658421851?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixblogSlug=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhcnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        blogSlug: 4,
        title: "African Elephant",
        description:
          "The African elephant is the largest living terrestrial animal and is found throughout sub-Saharan Africa. These magnificent creatures are known for their intelligence, strong family bonds, and complex social structures. They play a crucial role in their ecosystem by creating water holes used by other wildlife and dispersing seeds through their dung. African elephants have large ears shaped like the African continent, which help them regulate body temperature in the hot climate. Their trunks contain over 40,000 muscles and are used for communication, feeding, drinking, and showing affection. Sadly, these gentle giants face threats from poaching for their ivory tusks and habitat loss due to human encroachment.",
        imageUrl:
          "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        tags: ["mammal", "endangered", "herbivore", "wild", "terrestrial"],
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAnimal.fulfilled, (state, action) => {
        state.animals.push(action.payload);
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animals.findIndex(
          (a) => a.blogSlug === action.payload.blogSlug
        );
        if (index !== -1) state.animals[index] = action.payload;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter(
          (a) => a.blogSlug !== action.payload
        );
      })
      .addCase(getAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.find(value => value.blogSlug === action.payload.slug)
      })
  },
});

export default animalSlice.reducer;
