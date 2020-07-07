class ItinarySerializer
    include FastJsonapi::ObjectSerializer
    attributes :date, :start, :end
    has_many :events
end