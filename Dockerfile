FROM ruby:2.6
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /viewer2
WORKDIR /viewer2
COPY Gemfile /viewer2/Gemfile
COPY Gemfile.lock /viewer2/Gemfile.lock
RUN bundle install
COPY . /viewer2

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
