class PurgeCl < ApplicationJob
    queue_as :default

    def perform(event_photo_key)
        result = Cloudinary::Search
            .expression(filename=event_photo_key)
            .execute
        logger.debug ".................#{result}"
        if result.any?
            Cloudinary::Uploader.destroy(result['resources'][0]['public_id'])
        end
    end
end