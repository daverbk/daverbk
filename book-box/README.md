<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/16005567/82953423-9ba1c080-9f5f-11ea-86c4-691a46b3176e.png">
  <h3 align="center">book-box</h3>
  <p align="center">📚Update a pinned gist to contain your latest reads on Goodreads</p>
</p>

---

📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## Setup

### Prep work

1. [Create a new public GitHub Gist](https://gist.github.com/)
2. [Create a Goodreads account](https://www.goodreads.com/user/sign_up)
3. Extract your Goodreads list id from the `My Books` tab

### Project setup

1. Fork this repo
2. Go to the repo **Settings > Secrets**
3. Add the following environment variables:
  - **GIST_ID:** The ID of the gist you created above (`https://gist.github.com/amorriscode/`**`3f84910b524db4819ec2dc1063f632ab`**).
  - **GH_TOKEN:** The GitHub token generated above.
  - **GOODREADS_LIST_ID:** The id of your GR list (`https://www.goodreads.com/review/list/`**`189727934`**`?ref=nav_mybooks`) 

## Inspiration

This gist was inspired by [matchai's](https://github.com/matchai) [bird-box](https://github.com/matchai/bird-box).
