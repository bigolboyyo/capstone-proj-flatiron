class StoriesController < ApplicationController
  before_action :find_story, only: [:show, :destroy, :update]

  def index
    render json: Story.all,
           except: creation_ref, status: :ok
  end

  def show
    render json: @story, status: :ok
  end

  def active_story
    @cur_story = Story.all.find { |s| s.character_id == params[:character_id] }
    @active_story_line = @cur_story.current_story_line
    render json: { cur_story: @cur_story, active_story_line: @active_story_line },
           except: creation_ref, status: :ok
  end

  def create
    @story = Story.create!(story_params)
    render json: @story, status: :created
  end

  def update
    @story.update!(story_params)
    render json: @story, status: :ok
  end

  def destroy
    @story.destroy
    head :no_content
  end

  private

  def story_params
    params.permit(:starting_point, :character_id, :current_story_line)
  end

  def find_story
    @story = Story.find(params[:id])
    !@story ? record_not_found(@story) : @story
  end
end
