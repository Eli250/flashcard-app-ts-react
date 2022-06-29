import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import {
  createFlashcardAction,
  flashcardErrorAction,
  getAllCardsAction,
  IFlashcardState,
  IFlashcardType,
  loadingCreateCardAction,
  loadingGetAllCardsAction,
} from "../redux/reducers/card.reducer";
import { RootState } from "../redux/store";
import { cardSchema } from "../validations/card.validation";
import FlipCard from "./card";

const FIND_ALL_CARDS = gql`
  query Query(
    $filter: String
    $orderBy: [CardOrderByInput!]
    $skip: Int
    $take: Int
  ) {
    allFlashcards(
      filter: $filter
      orderBy: $orderBy
      skip: $skip
      take: $take
    ) {
      id
      question
      answer
      details
      isDone
      image
      cardOwner {
        name
      }
    }
  }
`;
const ADD_FLASHCARD = gql`
  mutation ($question: String!, $answer: String!, $details: String!) {
    post(question: $question, answer: $answer, details: $details) {
      id
      question
      answer
      isDone
      cardOwner {
        name
      }
    }
  }
`;
interface ICardInputs {
  question: string;
  answer: string;
  details: string;
  image?: string;
  isDone?: boolean;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function CardList() {
  const flashcardData: IFlashcardState = useSelector(
    (state: RootState) => state.flashcardReducer
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [take] = useState<number | undefined>(undefined);
  const [skip] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<string>("ASC");
  const [allFlashcards] = useLazyQuery(FIND_ALL_CARDS);
  const [post, { loading }] = useMutation(ADD_FLASHCARD);
  const dispatch: Dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICardInputs>({
    resolver: yupResolver(cardSchema),
  });
  const onsubmit: SubmitHandler<ICardInputs> | undefined = async (
    data: ICardInputs
  ) => {
    console.log(data);
    dispatch(loadingCreateCardAction({}));
    await post({
      variables: data,
      onError: (error) => {
        toast.error(error.message);
        dispatch(flashcardErrorAction(error.message));
      },
      onCompleted: (data) => {
        toast.success("Card Added Successfully");
        console.log(data);
        dispatch(createFlashcardAction(data.post));
        handleClose();
        reset();
      },
    });
  };

  const fetchAllFlashcards = async () => {
    let variables = {};
    if (filter) {
      variables = Object.assign(variables, { filter: filter });
    }
    if (take) {
      variables = Object.assign(variables, { take: take });
    }
    if (skip) {
      variables = Object.assign(variables, { skip: skip });
    }
    if (sortBy) {
      let obj: any = {};
      obj[sortBy] = sortOrder;
      variables = Object.assign(variables, {
        // orderBy: [{ sortBy: sortOrder }],
        orderBy: obj,
      });
    }
    dispatch(loadingGetAllCardsAction({}));
    await allFlashcards({
      variables,
      fetchPolicy: "network-only",
      onError: (error) => {},
    })
      .then((value) => {
        if (value.error) {
          throw value.error;
        }
        dispatch(getAllCardsAction(value.data));
      })
      .catch((error) => {
        toast.error(error.message);
        dispatch(flashcardErrorAction(error));
      });
  };
  //@ts-ignore
  useEffect(() => {
    fetchAllFlashcards().then(() => {
      console.log("Fetch completed successfully");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Grid container gap="10px" margin="30px 0px">
        <Grid item>
          <Stack>
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: "10px 15px", width: "250px" }}
              onClick={handleOpen}
            >
              <>
                <AddIcon sx={{ margin: "0px 5px" }} />
                <Typography fontSize="14px" fontWeight="bold">
                  Create FlashCard
                </Typography>
              </>
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <TextField
            size="small"
            id="filter"
            label="Filter"
            name="filter"
            autoComplete="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="select-label">Order By</InputLabel>
            <Select
              labelId="select-label"
              size="small"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
              sx={{ width: "150px" }}
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="question">Question</MenuItem>
              <MenuItem value="answer">Answer</MenuItem>
              <MenuItem value="">none</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Select
            size="small"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              console.log(e.target.value);
            }}
            sx={{ width: "150px" }}
          >
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => fetchAllFlashcards()}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          marginLeft: 0,
          flexGap: "10px",
          fontFamily: "Josefin Sans, sans-serif",
        }}
        spacing={2}
      >
        {!flashcardData.loadingGet && flashcardData.data ? (
          flashcardData.data.allFlashcards.map((flashcard: IFlashcardType) => (
            <Grid item md={6} key={flashcard.id} xs={12} sm={12} lg={4}>
              <FlipCard flashcard={flashcard} />
            </Grid>
          ))
        ) : (
          <CircularProgress />
        )}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          sx={style}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit(onsubmit)}>
            <TextField
              margin="normal"
              fullWidth
              id="question"
              label="Question"
              autoComplete="question"
              autoFocus
              {...register("question")}
              {...(errors?.question && {
                error: true,
                helperText: errors?.question.message,
              })}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Answer"
              id="answer"
              autoComplete="answer"
              {...register("answer")}
              {...(errors?.answer && {
                error: true,
                helperText: errors?.answer.message,
              })}
            />
            <TextField
              margin="normal"
              fullWidth
              id="details"
              label="Details"
              autoComplete="details"
              autoFocus
              {...register("details")}
              {...(errors?.details && {
                error: true,
                helperText: errors?.details.message,
              })}
            />
            <TextField
              margin="normal"
              fullWidth
              id="image"
              label="Image Url"
              autoComplete="image"
              autoFocus
              {...register("image")}
              {...(errors?.image && {
                error: true,
                helperText: errors?.image.message,
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Add Card"
              )}
            </Button>
          </form>
        </Grid>
      </Modal>
    </Container>
  );
}
