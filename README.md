Rails app generated with [lewagon/rails-templates](https://github.com/lewagon/rails-templates), created by the [Le Wagon coding bootcamp](https://www.lewagon.com) team.

- Notes:

<https://stackoverflow.com/questions/39914455/react-validatedomnesting-text-cannot-appear-as-a-child-of-tr/39915085>

Usually, we would send a form’s data to the back-end via an object of key and value pairs of the inputs (their names as the keys and values as, well, the values), JSON.stringifying this, and sending it as the body in our request. However, it isn’t as simple as this when we are working with files because they are not convertible to strings or formatted for JSON. Therefore, instead of sending it as JSON, we send it as a FormData object.
