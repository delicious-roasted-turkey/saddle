json.partial! 'outings/outing', outing: outing

json.reservations outing.reservations do |reservation|
  json.partial! reservation
end
