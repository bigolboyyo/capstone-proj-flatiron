ImageKitIo.configure do |config|
  if Rails.env.development?
    config.public_key = ENV["IK_PUBLIC_KEY"]
    config.private_key = ENV["IK_PRIVATE_KEY"]
    config.url_endpoint = ENV["IK_HOST"]
  end

  if Rails.env.production?
    config.public_key = ENV["IK_PUBLIC_KEY"]
    config.private_key = ENV["IK_PRIVATE_KEY"]
    config.url_endpoint = ENV["IK_HOST"]
  end
  config.service = :active_storage
  # config.constants.MISSING_PRIVATE_KEY = 'custom error message'
end
#make sure to replace the your_public_key, your_private_key and your_url_endpoint with actual values
