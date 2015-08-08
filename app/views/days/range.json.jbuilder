json.array! @days do |day|
  json.extract! day, *day.attributes.keys
  json.outings day.outings do |outing|
    json.partial! 'outings/outing', outing: outing
  end
end
