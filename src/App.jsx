import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setData} from "./redux/dataSlice";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Pagination from "@material-ui/lab/Pagination";
import Event from "./components/Event";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const apikey = import.meta.env.VITE_API_KEY;
  const dispatch = useDispatch();

  const getEventData = () => {
    axios
      .get(`https://app.ticketmaster.com/discovery/v2/events.json?locale=FR-FR&apikey=${apikey}`)
      .then((res) => {
        dispatch(setData(res.data._embedded.events));

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onPageChange = (event, value) => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?locale=FR-FR&apikey=${apikey}&page=${value}`
      )
      .then((res) => {
        dispatch(setData(res.data._embedded.events));

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const events = useSelector((state) => state.data.data);
  // const search = (e) => {

  //   const searchValue = e.target.value;
  //   if (!searchValue) {
  //     setFilteredData(originalData);
  //     return;
  //   }
  //   const filteredData = originalData.filter(item => {
  //     return item.title.toLowerCase().includes(searchValue.toLowerCase());
  //   })
  //   setFilteredData(filteredData);
  // }
  useEffect(() => {
    getEventData();
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="App">
      <h1>Events in France</h1>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{height: "10rem"}}
      >
        <Grid item xs={5}>
          <Pagination onChange={onPageChange} count={10} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid key={event.id} item xs={3}>
            <Event key={event.id} event={event} />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{height: "10rem"}}
      >
        <Grid item xs={5}>
          <Pagination onChange={onPageChange} count={10} />
        </Grid>
      </Grid>
      <div className=""></div>
    </div>
  );
}

export default App;
